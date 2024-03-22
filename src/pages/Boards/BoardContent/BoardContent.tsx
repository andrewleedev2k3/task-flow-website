import Box from '@mui/material/Box'
import ListColumns from '@/pages/Boards/BoardContent/ListColumns/ListColumns'
import { Board, Card as CardType, Column as ColumnType } from '@/apis/mock-data'
import { mapOrder } from '@/utils/sort'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  useSensor,
  useSensors,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  DragOverEvent,
  closestCorners,
  Active,
  Over,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '@/custom-libaries/DndKitSensors'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import Card from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '@/utils/formatters'

interface IBoardContent {
  board: Board
}

const BoardContent = ({ board }: IBoardContent) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 50,
      tolerance: 500
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<ColumnType | null>(
    null
  )
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeTypeColumn, setActiveTypeColumn] = useState<boolean>(false)
  const [activeData, setActiveData] = useState<ColumnType | CardType | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)

  useEffect(() => {
    setOrderedColumns(mapOrder<ColumnType>(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColByCardId = (cardId: string) => {
    return orderedColumns.find((col) => col?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const moveCarrdBetweenDifferentColumns = (
    overColumn: ColumnType,
    overCardId: UniqueIdentifier,
    active: Active,
    over: Over,
    activeColumn: ColumnType,
    activeDraggingCardId: UniqueIdentifier,
    activeDraggingCardData: CardType
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      let newCardIndex: number = 0
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((col) => col._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((col) => col._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData as CardType
        )

        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as ColumnType
    if (data) {
      if ('columnId' in data) {
        setActiveTypeColumn(false)
        setOldColumnWhenDraggingCard(findColByCardId(event?.active?.id as string)!)
      } else {
        setActiveTypeColumn(true)
      }
    }
    setActiveId(event?.active?.id)
    setActiveData(data)
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (activeTypeColumn) return

    const { active, over } = event
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColByCardId(activeDraggingCardId as string)
    const overColumn = findColByCardId(overCardId as string)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCarrdBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData as CardType
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    if (!activeTypeColumn) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColByCardId(activeDraggingCardId as string)
      const overColumn = findColByCardId(overCardId as string)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard!._id !== overColumn._id) {
        // Hành động kéo thả card giữa 2 column khác nhau
        moveCarrdBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData as CardType
        )
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(
          (col) => col._id === activeId
        )
        const newCardIndex = overColumn?.cards.findIndex((col) => col._id === overCardId)
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard!.cards,
          oldCardIndex!,
          newCardIndex
        )

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find((col) => col._id === overColumn._id)

          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)
          }

          return nextColumns
        })
      }
    }

    if (activeTypeColumn && active.id !== over?.id) {
      const oldColumnIndex = orderedColumns.findIndex((col) => col._id === active.id)
      const newColumnIndex = orderedColumns.findIndex((col) => col._id === over?.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveTypeColumn(false)
    setActiveId(null)
    setActiveData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeTypeColumn) return closestCorners({ ...args })

      const pointerIntersection = pointerWithin(args)

      const intersections = !!pointerIntersection?.length
        ? pointerIntersection
        : rectIntersection(args)

      let overId = getFirstCollision(intersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((col) => col._id === overId)
        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id as string)
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeTypeColumn, orderedColumns]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.app.boardContentHeight,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db'),
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeId || !activeTypeColumn) && null}
          {activeId && activeTypeColumn && <Column column={activeData as ColumnType} />}
          {activeId && !activeTypeColumn && <Card card={activeData as CardType} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
