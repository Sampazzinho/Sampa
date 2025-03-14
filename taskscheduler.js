import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teamMembers = ["Andrea", "Luca", "Riccardo", "Stefano"];
const activities = ["Attività 1", "Attività 2", "Attività 3"];

export default function TaskScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [assignments, setAssignments] = useState({});

  const handleAssignmentChange = (member, activity) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setAssignments(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [member]: activity
      }
    }));
  };

  const handleSave = () => {
    console.log("Assegnazioni salvate:", assignments);
    // Qui potrai integrare la sincronizzazione con Microsoft Lists
  };

  const renderAssignments = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const dayAssignments = assignments[dateKey] || {};

    return teamMembers.map(member => (
      <Card key={member} className="p-4">
        <CardContent>
          <div className="flex justify-between items-center">
            <span>{member}</span>
            <select
              onChange={(e) => handleAssignmentChange(member, e.target.value)}
              value={dayAssignments[member] || ''}
              className="border p-2 rounded-md"
            >
              <option value="">Seleziona attività</option>
              {activities.map(activity => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pianificazione Attività</h1>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      {renderAssignments()}

      <Button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-md">Salva Assegnazioni</Button>
    </div>
  );
}
