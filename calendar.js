const Calendar = (width) => {
    const date = new Date()
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000)
    const utcGap = 9 * 60 * 60 * 1000
    const today = new Date(utc + utcGap)

    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const $year = document.querySelector('.year')
    const $month = document.querySelector('.month')

    const $button_prev = document.querySelector('.nav-button-prev')
    const $button_next = document.querySelector('.nav-button-next')

    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    let currentYear = thisMonth.getFullYear()
    let currentMonth= thisMonth.getMonth()

    // eslint-disable-next-line no-unused-vars
    let currentDate = thisMonth.getDate()

    const $input = document.querySelector('.date-picker')

    let fontSize = 12

    document.documentElement.style.setProperty('--width-size', width +"px")
    if (width <= 400) {
        document.documentElement.style.setProperty('--text-size', fontSize + "px")
    } else {
        fontSize = Number.parseInt(fontSize / 400 * width)
        document.documentElement.style.setProperty('--text-size', fontSize + "px")
    }

    let content = ''

    makeCalendar(thisMonth)

    function makeCalendar(thisMonth) {
        currentYear = thisMonth.getFullYear()
        currentMonth = thisMonth.getMonth()
        currentDate = thisMonth.getDate()

        let todayDate;
        let thismonth = ('0' + (currentMonth + 1)).slice(-2)
        let nextmonth = ('0' + (currentMonth + 2)).slice(-2)
        let prevmonth = ('0' + currentMonth).slice(-2)

        // 이전 달의 마지막 날짜와 요일
        const startDay = new Date(currentYear, currentMonth, 0)
        const prevDate = startDay.getDate()
        const prevDay = startDay.getDay()

        
        // 이번 달의 마지막 날짜와 요일
        const endDay = new Date(currentYear, currentMonth + 1, 0)
        const nextDate = endDay.getDate()
        const nextDay = endDay.getDay()

        $year.textContent = currentYear
        $month.textContent = monthName[currentMonth]

        const $calendar = document.querySelector('.dates')
        $calendar.innerHTML = ''

        if (prevDay !== 6) {
            // 지난달
            for (let i = prevDate - prevDay ; i <= prevDate; i++) {
                $calendar.innerHTML = $calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
            }
        }

        // 이번달
        for (let i = 1; i <= nextDate; i++) {
            $calendar.innerHTML = $calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }

        // 다음달
        for (let i = 1; i < (14 - nextDay == 14 ? 7 : 14 - nextDay); i++) {
            $calendar.innerHTML = $calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate()
            const $currentMonthDate = document.querySelectorAll('.dates .current')
            $currentMonthDate[todayDate - 1].classList.add('today')
        }

        const $selectDate = document.querySelectorAll('.day')
    
        $selectDate.forEach((date) => {
            date.addEventListener('click' , function() {
                let dateFixed = ('0' + date.innerText).slice(-2)
                if(date.classList.contains('prev')) {
                    if (currentMonth === 0) {
                        content = (currentYear - 1) + "-" + (currentMonth+12) + "-" + dateFixed
                    } else {
                        content = currentYear + "-" + prevmonth+ "-" + dateFixed
                    }
                }else if (date.classList.contains('next')) {
                    if (currentMonth === 11) {
                        content = (currentYear +1) + "-0" + (currentMonth - 10) + "-" + dateFixed
                    } else {
                        content = currentYear + "-" + nextmonth+ "-" + dateFixed
                    }
                } else {
                    content = currentYear + "-" + thismonth + "-" + dateFixed
                }
                $input.value = content
            })
        })
    }

    $button_prev.addEventListener('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1)
        makeCalendar(thisMonth)
    })

    $button_next.addEventListener('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1)
        makeCalendar(thisMonth)
    })
}

export default Calendar