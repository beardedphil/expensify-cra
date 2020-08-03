import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

// const ExpenseForm = (onSubmit, expense = {}) => {
//     const [description, setDescription] = useState('');
//     const [note, setNote] = useState('');
//     const [amount, setAmount] = useState('');
//     const [createdAt, setCreatedAt] = useState(moment());
//     const [calendarFocused, setCalendarFocused] = useState(false);
//     const [error, setError] = useState('');
//
//     if (Object.keys(expense).length !== 0) {
//         setDescription(expense.description);
//         setNote(expense.note);
//         setAmount(expense.amount);
//         setCreatedAt(expense.createdAt);
//     }
//
//     const onDescriptionChange = (e) => {
//         const description = e.target.value;
//         setDescription(description);
//     };
//     const onNoteChange = (e) => {
//         const note = e.target.value;
//         setNote(note);
//     };
//     const onAmountChange = (e) => {
//         const amount = e.target.value;
//
//         if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
//             setAmount(amount);
//         }
//     };
//     const onDateChange = (createdAt) => {
//         if (createdAt) {
//             setCreatedAt(createdAt);
//         }
//     };
//     const onFocusChange = ({ focused }) => {
//         setCalendarFocused(focused);
//     };
//     const onSubmitLocal = (e) => {
//         e.preventDefault();
//
//         if (!description || !amount) {
//             setError('Please provide description and amount.');
//         } else {
//             setError('');
//             onSubmit({
//                 description,
//                 amount: parseFloat(amount) * 100,
//                 createdAt: createdAt.valueOf(),
//                 note
//             });
//         }
//     };
//
//     return (
//         <div>
//             {error && <p>{error}</p>}
//             <form onSubmit={onSubmitLocal}>
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     autoFocus
//                     value={description}
//                     onChange={onDescriptionChange}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={onAmountChange}
//                 />
//                 <SingleDatePicker
//                     date={createdAt}
//                     onDateChange={onDateChange}
//                     focused={calendarFocused}
//                     onFocusChange={onFocusChange}
//                     numberOfMonths={1}
//                     isOutsideRange={() => false}
//                 />
//                 <textarea
//                     placeholder="Add a note for your expense (optional)"
//                     value={note}
//                     onChange={onNoteChange}
//                 >
//                 </textarea>
//                 <button>Add Expense</button>
//             </form>
//         </div>
//     )
// };
//
// export default ExpenseForm;

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}
