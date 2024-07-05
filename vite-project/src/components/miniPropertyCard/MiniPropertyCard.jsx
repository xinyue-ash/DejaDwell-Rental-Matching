import { useSortable } from '@dnd-kit/sortable'
import './MiniPropertyCard.css'
import Carousel from '../carousel/Carousel'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../themes.jsx'

function MiniPropertyCard(props) {
  const { propertyInfo, likedFn, dislikedFn, displayPopup } = props

  if (!propertyInfo) return null

  // useSortable was written with the help of ChatGPT 3.5 on Jun 8th
  // Prompt: Give me some examples of dragging and dropping using the dnd kit. Then, use the
  // dnd toolkit to incorporate drag and drop functionality on the miniProperty card + "code in this file".
  // The generated code was adapted: I changed div organization to exclude some elements from being draggable

  // transform and transition not used currently, but keep them to potentially add further UI
  // improvements in the future
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: propertyInfo.HouseID,
    })

  const likeProperty = () => {
    likedFn(propertyInfo.HouseID)
  }

  const dislikeProperty = () => {
    dislikedFn(propertyInfo.HouseID)
  }

  const expandProperty = () => {
    console.log('house ' + propertyInfo.HouseID + ' was expanded!')
    displayPopup()
  }

  return (
    <>
      <div className="property-card" ref={setNodeRef}>
        <Carousel
          className="carousel-container"
          data={propertyInfo.HouseImgs}
          size={{ width: 450, height: 250 }}
        />
        <div {...attributes} {...listeners}>
          <div className="card-details">
            <h3 className="house-title">{propertyInfo.Title}</h3>
            <div className="details-row">
              <span className="rent">${propertyInfo.ExpectedPrice}</span>
              <span className="address">
                {propertyInfo.Street +
                  ', ' +
                  propertyInfo.City +
                  ', ' +
                  propertyInfo.Province}
              </span>
              <span className="house-type">{propertyInfo.RoomType}</span>
            </div>
          </div>
        </div>
        <div className="buttons-row">
          <button
            className="circle-button cross-button"
            onClick={dislikeProperty}
          >
            ✖
          </button>
          <ThemeProvider theme={theme}>
            <Button
              color="jet"
              variant="contained"
              onClick={expandProperty}
              className="expand-info-button"
            >
              Expand Info
            </Button>
          </ThemeProvider>
          <button
            className="circle-button checkmark-button"
            onClick={likeProperty}
          >
            ✔
          </button>
        </div>
      </div>
    </>
  )
}

export default MiniPropertyCard
