import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../features/goals/goalSlice";

function EditForm(props) {
  const [text, setText] = useState(props.text);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ text, id: props.id }));
    setText("");
    props.setEdit({ isEdit: false, text: "", id: "" });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Edit Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditForm;
