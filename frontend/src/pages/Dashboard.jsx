import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";
import EditForm from "../components/EditForm";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const [edit, setEdit] = useState({ isEdit: false, id: "", text: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate("/login");
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>
      {!edit.isEdit ? (
        <>
          <GoalForm />
          <section className="content">
            {goals.length > 0 ? (
              <div className="goals">
                {goals.map((goal) => (
                  <GoalItem key={goal._id} goal={goal} setEdit={setEdit} />
                ))}
              </div>
            ) : (
              <h3>You have not set any goals</h3>
            )}
          </section>
        </>
      ) : (
        <EditForm id={edit.id} text={edit.text} setEdit={setEdit} />
      )}
    </>
  );
}

export default Dashboard;
