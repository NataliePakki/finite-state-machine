class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config === undefined)
            throw new Error("config must not be undefined.");
        this.states = config.states;
        this.undoTransition = [];
        this.transition = [ config.initial ];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.transition[this.transition.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states[state] === undefined) {
            throw new Error("state doesn't exist"); 
        }        
        this.transition.push(state);
        this.undoTransition = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var currState = this.getState();
        var isFind = false;
        Object.keys(this.states[currState].transitions).forEach(function(i) {            
            if(i == event) {
                this.transition.push(this.states[currState].transitions[i]);
                isFind = true;
                return;
            }
        }, this);
        if(!isFind) {
            throw new Error();
        }
        this.undoTransition = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.transition = [ this.transition[0] ];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event === undefined) {
            return Object.keys(this.states);
        }
        var states = [];

        Object.keys(this.states).forEach(function(i) {
            var state = this.states[i];
            if(state.transitions[event] != undefined)
                states.push(i);
        }, this);
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.transition.length === 1 || this.transition.length === 0) {
            return false;
        }
        var state = this.transition.pop();
        this.undoTransition.push(state);
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.undoTransition.length === 0) {
            return false;
        }
        this.transition.push(this.undoTransition.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transition = [];        
        this.undoTransition = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
