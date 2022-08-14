import { useRef } from 'react'
import Button from '../ui/button'
import style from './events-search.module.css'

const EventSearch = (props) => {
  const yearInputRef = useRef()
  const monthInputRef = useRef()
  function sobmitHandler(event) {
    event.preventDefault()
    const yearValueSelect = yearInputRef.current.value
    const monthValueSelect = monthInputRef.current.value
    props.onSubmit(yearValueSelect, monthValueSelect)
  }
  return (
    <form className={style.form} onSubmit={sobmitHandler}>
      <div className={style.controls}>
        <div className={style.control}>
          <label htmlFor="year">year</label>
          <select
            className="border-b-2 border-blue-400"
            id="year"
            ref={yearInputRef}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={style.control}>
          <label htmlFor="month">year</label>
          <select
            className="border-b-2 border-blue-400"
            id="month"
            ref={monthInputRef}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">Septemer</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Finde events</Button>
    </form>
  )
}

export default EventSearch
