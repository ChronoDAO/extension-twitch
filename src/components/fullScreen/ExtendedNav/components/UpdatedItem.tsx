import React, { useEffect, useState } from 'react'
import './UpdatedItem.scss'
import '../ExtendedNav.scss'
export default function UpdatedItem({ updatedItem, updatedItems}) {
console.log(updatedItems)
  return (
    updatedItems !== undefined && (
      <>
        <h3>Last updates</h3>
      <div className="reel">
        {updatedItems.length > 0 &&
          updatedItems.map((item) => 
          <div key={item.archetypeId}>
            <div>
              <div>
                <a
                  key={item.id}
                  href={`https://openloot.com/items/BT0/${item.optionName}`}
                  target="_blank"
                  >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className={
                      item.rarityName
                    }
                    />
                </a>
              </div>
              <p>{item.name}</p>
              <p className="price">${item.floorPrice}</p>
            </div>
        </div>)}
      </div>
    </>
    )
  )
}
