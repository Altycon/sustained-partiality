const Current_Date = new Date();



const PreviousMonthButton = document.getElementById('PreviousMonthButton');
const NextMonthButton = document.getElementById('NextMonthButton');
const PreviousYearButton = document.getElementById('PreviousYearButton');
const NextYearButton = document.getElementById('NextYearButton');

const MonthArray = ["January", "Febuary", "March", "April", "May",
"June", "Junly", "August", "September", "October", "November", "December"];

function setCalendar(){
    // need to set the calendar to the current day before calendar is filled
}

function removeDays(){
    const Months = document.querySelectorAll('.month');

    Months.forEach(month=>{
        while(month.lastElementChild){
            month.removeChild(month.lastElementChild);
        }

    })
}

// Event Listener Functions
function getPreviousMonth(ev){
    ev.preventDefault();
    console.log(ev.target)
    const activeMonthTitle = document.querySelector('.month-display.active');
    const activeValue = Number(activeMonthTitle.getAttribute('value'));
    if(activeValue === 0) return;
    const monthTitles = document.querySelectorAll('.month-display');  
    monthTitles[activeValue - 1].classList.add('active');
    monthTitles[activeValue - 1].style.animation = 'moveLeft 400ms linear forwards';
    activeMonthTitle.classList.remove('active');

    const activeMonth = document.querySelector('.month.active');
    const Months = document.querySelectorAll('.month');
    Months[activeValue - 1].classList.add('active');
    Months[activeValue - 1].style.animation = 'moveDown 400ms linear forwards';
    activeMonth.classList.remove('active');
    
}
function getNextMonth(ev){
    ev.preventDefault();
    console.log(ev.target)
    const activeMonthTitle = document.querySelector('.month-display.active');
    const activeValue = Number(activeMonthTitle.getAttribute('value'));
    if(activeValue === 11) return;
    const monthTitles = document.querySelectorAll('.month-display');
    monthTitles[activeValue + 1].classList.add('active');
    monthTitles[activeValue + 1].style.animation = 'moveRight 400ms ease forwards';
    activeMonthTitle.classList.remove('active');

    const activeMonth = document.querySelector('.month.active');
    const Months = document.querySelectorAll('.month');
    Months[activeValue + 1].classList.add('active');
    Months[activeValue + 1].style.animation = 'moveUp 400ms ease forwards';
    activeMonth.classList.remove('active');

}



function getPreviousYear(ev){
    ev.preventDefault();

    const target = document.querySelector('.year-display');
    const currentYear = Number(target.innerText);
    const newYear = currentYear - 1;
    target.innerText = newYear;

    removeDays();
    fillCalendar(newYear);
}

function getNextYear(ev){
    ev.preventDefault();

    const target = document.querySelector('.year-display');
    const currentYear = Number(target.innerText);
    const newYear = currentYear + 1;
    target.innerText = newYear;

    removeDays();
    fillCalendar(newYear);
}


function fillCalendar(year){
    
    const Months = document.querySelectorAll('.month');

    Months.forEach( month =>{
        const Month_Value = Number(month.dataset.month);
        const Total_Days_Of_Month = new Date(year, Month_Value + 1, 0).getDate();
        const Start_Day = new Date(year, Month_Value, 1).getDay();
        const End_Day = new Date(year, Month_Value, Total_Days_Of_Month).getDay();
        const Total_Days_Of_Previous_Month = new Date(year, Month_Value, 0).getDate();
        
        let temp = Total_Days_Of_Previous_Month - Start_Day + 1;

        const documentFragment = new DocumentFragment();

        // creating H2 element for month background
        let monthBackgroundText = month.dataset.title;
        let h2 = document.createElement('h2');
        h2.innerText = monthBackgroundText;
        h2.style.color = 'rgba(255,255,255, 0.3)';
        documentFragment.appendChild(h2);

        // Setting the previous month days
        // to fill the first part of the grid of days
        for(let i = 0; i < Start_Day; i++){
            let prev = document.createElement('div');
            prev.setAttribute('class', 'prev-m-day day');
            let prevNum = document.createElement('p');
            prevNum.innerText = `${temp}`;
            prev.appendChild(prevNum);
            documentFragment.appendChild(prev);
            temp++;
        }

        //Setting the days of the month
        for(let j = 0; j < Total_Days_Of_Month; j++){
            let day = document.createElement('div');
            day.setAttribute('class', 'current-m-day day');
            day.setAttribute('data-year', year);
            day.setAttribute('data-month', Month_Value);
            day.setAttribute('data-day', j + 1);
            // Set id for current day...today
            if(year === Current_Date.getFullYear() && 
                Month_Value === Current_Date.getMonth() &&
                j + 1 === Current_Date.getDate()){
                    day.setAttribute('id', 'today');
                }
            let dayNum = document.createElement('p');
            dayNum.innerText = j + 1;
            day.appendChild(dayNum);
            documentFragment.appendChild(day);
        }
        
        // Setting the next month days to fill the grid of days
        let total = 6 - End_Day;
        for(let k = 0; k < total; k++){
            let next = document.createElement('div');
            next.setAttribute('class', 'next-m-day day');
            let nextNum = document.createElement('p');
            nextNum.innerText = k + 1;
            next.appendChild(nextNum);
            documentFragment.appendChild(next);
        }

        month.appendChild(documentFragment);

    })

}



function calendarStart(){
    const Year_Display = document.querySelector('.year-display');
    const Starting_Year_Value = Number(Year_Display.innerText);
    const Month_Display = document.querySelectorAll('.month-display');
    
    fillCalendar(Starting_Year_Value);

    PreviousMonthButton.addEventListener('click', getPreviousMonth);
    NextMonthButton.addEventListener('click', getNextMonth);
    PreviousYearButton.addEventListener('click', getPreviousYear);
    NextYearButton.addEventListener('click', getNextYear);
}
//document.addEventListener('DOMContentLoaded', init);