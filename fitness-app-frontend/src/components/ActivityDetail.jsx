import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        // console.log("Activity detail fetched:", response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-2xl border-2 mb-6 p-4 border-[#ff6900]">
        <h2 className="text-2xl font-semibold mb-4">Activity Details</h2>
        <p className="mb-2">
          <span className="font-semibold">Type:</span> {activity.activityType}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Duration:</span> {activity.duration}{" "}
          minutes
        </p>
        <p className="mb-2">
          <span className="font-semibold">Calories Burned:</span>{" "}
          {activity.caloriesBurned}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>

      {recommendation && (
        <div className="bg-white shadow-lg rounded-2xl border-2 p-4 hover:border-[#ff6900] transition-all duration-200">
          <h2 className="text-2xl font-semibold mb-4">AI Recommendation</h2>

          <h3 className="text-xl font-semibold mb-2">Analysis</h3>
          <p className="mb-4 text-justify">{activity.recommendation}</p>

          <hr className="my-4 border-gray-400" />

          <h3 className="text-xl font-semibold mb-2">Improvements</h3>
          {activity.improvements && activity.improvements.length > 0 ? (
            <ul className="list-disc list-inside mb-4 text-justify">
              {activity.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          ) : (
            <p className="mb-4">No improvements listed.</p>
          )}

          <hr className="my-4 border-gray-400" />

          <h3 className="text-xl font-semibold mb-2">Suggestions</h3>
          {activity.suggestions && activity.suggestions.length > 0 ? (
            <ul className="list-disc list-inside mb-4 text-justify">
              {activity.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className="mb-4">No suggestions listed.</p>
          )}

          <hr className="my-4 border-gray-400" />

          <h3 className="text-xl font-semibold mb-2">Safety Guidelines</h3>
          {activity.safety && activity.safety.length > 0 ? (
            <ul className="list-disc list-inside">
              {activity.safety.map((safety, index) => (
                <li key={index}> {safety}</li>
              ))}
            </ul>
          ) : (
            <p>No safety guidelines listed.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
