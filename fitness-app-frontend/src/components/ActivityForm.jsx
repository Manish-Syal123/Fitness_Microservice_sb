import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = React.useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg border hover:shadow-lg transition-shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label htmlFor="text">Activity Type</Label>
        <Select
          value={activity.type}
          onValueChange={(value) => setActivity({ ...activity, type: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="RUNNING">RUNNING</SelectItem>
              <SelectItem value="CYCLING">CYCLING</SelectItem>
              <SelectItem value="SWIMMING">SWIMMING</SelectItem>
              <SelectItem value="HIKING">HIKING</SelectItem>
              <SelectItem value="YOGA">YOGA</SelectItem>
              <SelectItem value="WEIGHTLIFTING">WEIGHTLIFTING</SelectItem>
              <SelectItem value="WALKING">WALKING</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          placeholder="Enter duration in minutes"
          value={activity.duration}
          onChange={(e) =>
            setActivity({ ...activity, duration: e.target.value })
          }
          required
        />
        <Label htmlFor="caloriesBurned">Calories Burned</Label>
        <Input
          id="caloriesBurned"
          type="number"
          placeholder="Enter calories burned"
          value={activity.caloriesBurned}
          onChange={(e) =>
            setActivity({ ...activity, caloriesBurned: e.target.value })
          }
          required
        />
        <Button
          type="submit"
          className="w-full py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ActivityForm;
