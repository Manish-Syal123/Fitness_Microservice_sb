import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";
import { Card, CardContent } from "./ui/card";

const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
      console.log("Activities fetched:", response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
      {activities.map((activity) => (
        <Card
          key={activity.id}
          className="cursor-pointer hover:shadow-lg border-dashed border-2 border-[#ff6900] transition-shadow duration-200"
          onClick={() => navigate(`/activities/${activity.id}`)}
        >
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">{activity.type}</h3>
            <p>Duration: {activity.duration}</p>
            <p>Calories: {activity.caloriesBurned}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActivityList;
