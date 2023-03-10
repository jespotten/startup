import {TaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete} from './main.js';
export {addTaskList};

let taskListCounter = 0;
let taskListContainer;
const currUser = (JSON.parse(sessionStorage.getItem('currentUser')));
console.log(currUser.username);
document.getElementById('user').innerHTML = currUser.username;

function addTaskList()
{
    if(!listSetUpComplete) return;

    taskListContainer = document.getElementById('list-container');
    let newTaskList = new TaskList("CS 260 Exams", taskListCounter, []);
    taskListContainer.appendChild(newTaskList.taskListCard);
    newTaskList.taskListCard.getElementsByClassName('star')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const starIcon = e.target.parentElement;
        const filledStarIcon = document.createElement('i');
        filledStarIcon.className = "star";
        filledStarIcon.innerHTML += pinnedIcon;
        filledStarIcon.addEventListener('click', () => {
            divEl.replaceChild(starIcon, filledStarIcon);
        });
        divEl.replaceChild(filledStarIcon, starIcon);
    });

    newTaskList.taskListCard.getElementsByClassName('trash')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const listsDivEl = divEl.parentElement;
        listsDivEl.removeChild(divEl);
        setListSetUpComplete(true);
    })
    taskListCounter++;
}

document.getElementById('addList').addEventListener('click', addTaskList);