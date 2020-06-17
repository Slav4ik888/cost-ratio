import React from 'react';
import s from './Tasks.module.css';
// import cl from 'classnames';

// Карточка для примера
const Task = ({ a, b, type }) => {
    const task = `${a} ${type} ${b} = `;

    return (
        <div className={s.card}>
            <div className={s.task}>
                {task} 
            </div>
            <div className={s.result}></div>
        </div>
    );
    
}

// Рендер карточек
const ShowTasks = ({ plusTasks, minusTasks }) => {
    return (
        <div className={s.section}>
            <div className={s.root}>
                    {plusTasks.map( ({ a, b } , index) => (
                            <Task a={a} b={b} type={'+'} key={index}/>
                        ))}
                    {minusTasks.map( ({ a, b } , index) => (
                            <Task a={a} b={b} type={'-'}key={index}/>
                        ))}
            </div>
        </div>
    );
}

class ShowForm extends React.PureComponent {

    state = {
        qualPlusTasks: 10,  // Кол-во примеров сложения
        minPlus: 1,        // От 
        maxPlus: 15,        // До

        qualMinusTasks: 10, // Кол-во примеров сложения
        minMinus: 1,       // От 
        maxMinus: 15,       // До
    }

    // СЛОЖЕНИЕ
    changeQualPlus = event => {this.setState({ qualPlusTasks: event.target.value })}
    changeMinPlus = event => {this.setState({ minPlus: event.target.value })}
    changeMaxPlus = event => {this.setState({ maxPlus: event.target.value })}

    createSum = () => {
        const { qualPlusTasks, minPlus, maxPlus } = this.state;
        let arr = [], task = {};
        if (!qualPlusTasks) return;
        
        for(let i=0; i < qualPlusTasks; i++) {
            task.a = Math.floor(+minPlus + Math.random() * (maxPlus - minPlus + 1)  );
            task.b = Math.floor(+minPlus + Math.random() * (maxPlus - minPlus + 1)  );
            
            // Проверяем, чтобы цифры были не одинаковые
            if (task.a !== task.b) {
                arr.push(task); 
                i++;
            }
            i--;
            task = {};
        }
        return arr; // Возвращаем готовые приимеры
    }

    // ВЫЧИТАНИЕ
    changeQualMinus = event => {this.setState({ qualMinusTasks: event.target.value })}
    changeMinMinus = event => {this.setState({ minMinus: event.target.value })}
    changeMaxMinus = event => {this.setState({ maxMinus: event.target.value })}

    createMinus = () => {
        const { qualMinusTasks, minMinus, maxMinus } = this.state;
        if (!qualMinusTasks) return;

        let arr = [], task = {};

        for(let i=0; i < qualMinusTasks; i++) {
            task.a = Math.floor(+minMinus + Math.random() * (maxMinus - minMinus + 1) );
            task.b = Math.floor(+minMinus + Math.random() * (task.a - minMinus + 1) );
            
            // Проверяем, чтобы цифры были не одинаковые
            if (task.a !== task.b) {
                arr.push(task); 
                i++;
            }
            i--;
            task = {};
        }
        return arr; // Возвращаем готовые приимеры
    }

    // ЗАПУСК
    create = event => {
        event.preventDefault();
        this.props.callback( this.createSum(), this.createMinus() );
    }
    

    render() {
        return (
            <div className={s.section}>
                <div className={s.root}>
                    <form onSubmit={this.create}>
                        <div className={s.title}>Задачи по "Сложению"</div>
                        <label>Сколько создать 
                            <input type="number"  className={s.inputMaxMin}
                                value={this.state.qualPlusTasks}
                                onChange={this.changeQualPlus} />
                        </label>
                        <label>Числа от
                            <input type="number"  className={s.inputMaxMin}
                                value={this.state.minPlus}
                                onChange={this.changeMinPlus} />
                        </label>
                        <label>До
                            <input type="number" className={s.inputMaxMin}
                                value={this.state.maxPlus}
                                onChange={this.changeMaxPlus} />
                        </label>

                        <div className={s.title}>Задачи по "Вычитанию"</div>
                        <label>Сколько создать 
                            <input type="number"  className={s.inputMaxMin}
                                value={this.state.qualMinusTasks}
                                onChange={this.changeQualMinus} />
                        </label>
                        <label>Числа от
                            <input type="number"  className={s.inputMaxMin}
                                value={this.state.minMinus}
                                onChange={this.changeMinMinus} />
                        </label>
                        <label>До
                            <input type="number" className={s.inputMaxMin}
                                value={this.state.maxMinus}
                                onChange={this.changeMaxMinus} />
                        </label>

                        <input type="submit" value="Создать" className={s.input}/>
                    </form>
                </div>
            </div>
        );
    }
}


class Tasks extends React.PureComponent {

    state = {
        isDone: true, // Показ формы
        isTasks: false, // Вывод примеров
        plusTasks: [],
        minusTasks: [],
    }

    handleTasks = (plusTasks, minusTasks) => {
        console.log('TASK minusTasks: ', minusTasks);
        console.log('TASK plusTasks: ', plusTasks);

        this.setState({
            plusTasks, minusTasks,
            isDone: false,
            isTasks: true,
        })
    }


    render() {
        const { isDone, isTasks, plusTasks, minusTasks  } = this.state;
        
        return (
            <>
                { isDone ? <ShowForm callback={this.handleTasks}/> : '' }
                { isTasks ? <ShowTasks plusTasks={plusTasks} minusTasks={minusTasks} /> : ''}

            </>
        )
    }
}

export default Tasks;