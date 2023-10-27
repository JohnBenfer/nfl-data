import React from 'react';
import '../css/Calendar.css';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      today: today,
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      selectedDay: today.getDay(),
      selectedDate: today.getDate(),
      daysInSelectedMonth: this.getDaysInMonth(today.getMonth(), today.getFullYear()),
      events: [],
    }
  }

  getDaysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
  }

  getSelectedMonthStartDay() {
    return new Date(this.state.selectedYear, this.state.selectedMonth, 1).getDay();
  }

  getSelectedMonthLastDay() {
    return new Date(this.state.selectedYear, this.state.selectedMonth + 1, 0).getDay();
  }

  getPreviousMonthVisibleDays() {
    const numberOfDays = this.getSelectedMonthStartDay();
    const lastDay = new Date(this.state.selectedYear, this.state.selectedMonth === 0 ? 11 : this.state.selectedMonth, 0).getDate();
    return [...Array(numberOfDays)].map((v, i) => lastDay - i).reverse();
  }

  getNextMonthVisibleDays() {
    const numberOfDays = 6 - this.getSelectedMonthLastDay();
    return [...Array(numberOfDays)].map((v, i) => numberOfDays - i).reverse();
  }

  nextButtonClick = () => {
    this.setStateByDate(new Date(this.state.selectedYear, this.state.selectedMonth + 1, 1));
  } 

  prevButtonClick = () => {
    this.setStateByDate(new Date(this.state.selectedYear, this.state.selectedMonth - 1, 1));
  } 

  setStateByDate = (date) => {
    this.setState({
      selectedMonth: date.getMonth(),
      selectedYear: date.getFullYear(),
      selectedDay: date.getDay(),
      selectedDate: date.getDate(),
      daysInSelectedMonth: this.getDaysInMonth(date.getMonth(), date.getFullYear()),
    });
  }

  dayClicked = (day) => {
    let events = this.state.events;
    events.push({ date: new Date(this.state.selectedYear, this.state.selectedMonth, day), text: `event on ${day}`});
    this.setState({ events: events });
    console.log(events);
  }

  getEventsForDate = (i, selectedYear, selectedMonth) => {
    return this.state.events.map((e) => {
      if((new Date(e.date)).getTime() == (new Date(selectedYear, selectedMonth, i+1)).getTime()) {
        return <div>{e.text}</div>
      }
    });
  }

  render() {
    const {selectedDate, selectedDay, selectedMonth, selectedYear, events} = this.state;
    return (
      <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "70px"}}>
        <div style={{ display: "flex", flexDirection: "row", width: "80%", alignItems: "baseline"}}>
          <h3 style={{ width: "100%", marginLeft: "163px" }}>
            {`${monthNames[this.state.selectedMonth]} ${this.state.selectedYear}`}
          </h3>
          <div style={{ justifyContent: "flex-end", display: "flex", width: "200px"}}>
            <div className='nav-button' onClick={this.prevButtonClick}>
              {"Previous"}
            </div>
            <div className='nav-button' onClick={this.nextButtonClick}>
              {"Next"}
            </div>
          </div>
        </div>
        <div style={{ width: "80%"}}>
          <div className="day-heading-container" style={{ }}>
            <div className="day-heading">
              Sunday
            </div>
            <div className="day-heading">
              Monday
            </div>
            <div className="day-heading">
              Tuesday
            </div>
            <div className="day-heading">
              Wednesday
            </div>
            <div className="day-heading">
              Thursday
            </div>
            <div className="day-heading">
              Friday
            </div>
            <div className="day-heading">
              Saturday
            </div>
          </div>
          <div className='calendar-container'>
            {this.getPreviousMonthVisibleDays().map((v, i) => 
              <div className='calendar-day off-month'>
                <div>
                  {v}
                </div>
              {this.getEventsForDate(v - 1, selectedYear, selectedMonth - 1)}
            </div>)}
            {[...Array(this.state.daysInSelectedMonth)].map((v, i) => {
              return(
                <div className='calendar-day' onClick={() => this.dayClicked(i+1)}>
                  <div>
                    {i+1}
                  </div>
                  {this.getEventsForDate(i, selectedYear, selectedMonth)}
                </div>
              );
            })}
            {this.getNextMonthVisibleDays().map((v, i) => 
              <div className='calendar-day off-month'>
                <div>
                  {v}
                </div>
                {this.getEventsForDate(i, selectedYear, selectedMonth + 1)}
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;