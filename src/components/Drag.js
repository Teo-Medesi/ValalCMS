import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'

const Drag = ({children, element, type, setIsDragging}) => {

    const [{isDragging}, dragRef] = useDrag({
        type: type,
        item: (element),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    useEffect(() => {
        if (setIsDragging != null)
        {
            isDragging ? setIsDragging(true) : setIsDragging(false);
        }
    }, [isDragging]);

    return (
        <div className='cursor-pointer' ref={dragRef}>
            {children}
        </div>
    )
}

export default Drag