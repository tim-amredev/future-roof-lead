"use client"

import { useState } from "react"
import type { UseFormRegister } from "react-hook-form"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { GripVertical } from "lucide-react"

interface RankingOption {
  id: string
  label: string
}

interface RankingSelectorProps {
  options: RankingOption[]
  register: UseFormRegister<any>
}

export default function RankingSelector({ options, register }: RankingSelectorProps) {
  const [items, setItems] = useState<RankingOption[]>(options)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500 mb-4">Drag to rank from most important (top) to least important (bottom)</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ranking">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center p-3 bg-white border rounded-md"
                    >
                      <div className="mr-3 text-gray-400">
                        <GripVertical size={20} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      <div className="ml-auto bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <input type="hidden" {...register(`ranking_${item.id}`)} value={index + 1} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

