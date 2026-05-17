'use client'

import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto">
      <a href="#events">
        Explore More
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
      </a>
    </button>
  )
}

export default ExploreBtn