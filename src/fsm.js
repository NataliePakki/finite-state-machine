class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config === undefined)
            throw new Error("config must not be undefined.");
        this.states = config.states;
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
        
        this.transition[this.transition.length - 1] = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */

    // states: {
    //     normal: {
    //         transitions: {
    //             study: 'busy',
    //         }
    //     },
    //     busy: {
    //         transitions: {
    //             get_tired: 'sleeping',
    //             get_hungry: 'hungry',
    //         }
    //     },
    //     hungry: {
    //         transitions: {
    //             eat: 'normal'
    //         },
    //     },
    //     sleeping: {
    //         transitions: {
    //             get_hungry: 'hungry',
    //             get_up: 'normal',
    //         },
    //     },
    // }
    trigger(event) {
        var currState = getState();
        Object.keys(this.states[currState].transitions).forEach(function(i) {
            if(i[event] != undefined) {
                this.transition.push(i);
                return;
            }
        }, this);
        return false;
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
        if(this.transition.length === 1) {
            return false;
        }
        this.transition.pop();
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transition = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
