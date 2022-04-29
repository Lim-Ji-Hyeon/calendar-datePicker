import Calendar from "./calendar.js";

const $datePicker = document.querySelector('.date-picker')
const $calendar = document.querySelector('.calendar')

let calendarOpen

function init () {
    $datePicker.addEventListener('click', function() {
        $calendar.classList.add('is--active')
        calendarOpen = true
    })
    window.addEventListener('load', Calendar(500))
    window.addEventListener('click', function(e) {
        if (calendarOpen === true) {
            if (!e.target.classList.contains('date-picker')) {
                let targetTag = e.target
                let parent = targetTag.closest('.calendar')
                if (!parent) {
                    $calendar.classList.remove('is--active')
                    calendarOpen = false
                }else if (e.target.classList.contains('day')) {
                    $calendar.classList.remove('is--active')
                    calendarOpen = false
                }
            }
        }
    })

}

init()