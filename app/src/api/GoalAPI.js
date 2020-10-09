import {v4 as uuidv4} from 'uuid';

class GoalSelector {
    constructor(goals) {
        this.list = goals;
        this.total = 0;
        this.list.forEach(element => {
            this.total += element.weight
        });
    }

    getRandomTask() {
        const threshold = Math.floor(Math.random() * this.total); 
        let currIndex = 0;
        let total = 0;
        while (total <= threshold) {
            total += this.list[currIndex].weight;
            currIndex += 1;
        }
        return(this.list[currIndex-1]);
    }

    getTopPriorityTask() {
        var topPriorty = this.list[0];
        this.list.forEach(element => {
            if (element.weight > topPriorty.weight) {
                topPriorty = element;
            }
        })
        return(topPriorty);
    }
}

function createGoal(title, weight) {
    var id = uuidv4();
    return({key: id, title: title, weight: weight - 1});
}

// TODO: Eventually I'm gonna have to do this
function storeGoal() {
    // this will eventually store the goals in a db
}

function retriveGoal() {
    // this will eventually get the goals in a db
}

function retrieveAllGoals() {
    // this will eventually retrive all saved goals for user
}

function updateGoal() {
    // this will eventually update the goal
}

function deleteGoal() {
    // this will eventually delete a goal
}

export {
    GoalSelector,
    createGoal
}