import { useState } from "react";

const semesterData = [
  {
    id: 1,
    title: "Semester 1",
    gpa: "8.435",
    cgpa: "8.44",
    subjects: [
      { code: "22CH101", name: "Engineering Chemistry", grade: "A" },
      { code: "22CS101", name: "Problem Solving using C++", grade: "O" },
      { code: "22CS102", name: "Software Development Practices", grade: "A" },
      { code: "22EC101", name: "Digital Principles and System Design", grade: "A" },
      { code: "22GE101", name: "Computer Aided Engineering Graphics", grade: "A" },
      { code: "22GE111", name: "Product Development Lab - 1", grade: "O" },
      { code: "22MA101", name: "Matrices and Calculus", grade: "A" },
    ],
  },
  {
    id: 3,
    title: "Semester 3",
    gpa: "7.875",
    subjects: [
      { code: "22MA301", name: "Discrete Mathematics", grade: "A" },
      { code: "22GE302", name: "Universal Human Values II: Understanding Harmony", grade: "B+" },
      { code: "22GE301", name: "Tamils and Technology", grade: "A" },
      { code: "22CS302", name: "Computer Organization and Architecture", grade: "B+" },
      { code: "22CS301", name: "Advanced Java Programming (Lab Integrated)", grade: "A" },
      { code: "22CS303", name: "Design and Analysis of Algorithms (Lab Integrated)", grade: "A-" },
      { code: "22CS304", name: "Operating Systems (Lab Integrated)", grade: "A" },
      { code: "22CS313", name: "Product Development Lab– 3", grade: "B+" },
      { code: "22CS312", name: "Internship and Seminar", grade: "A" },
      { code: "22CS311", name: "Aptitude and Coding Skills", grade: "A+" },
    ],
  },
  {
    id: 4,
    title: "Semester 4",
    gpa: "7.920",
    cgpa: "8.15",
    subjects: [
      { code: "22AI301", name: "Artificial Intelligence (Lab Integrated)", grade: "A" },
      { code: "22CS401", name: "Distributed and Cloud Computing (Lab Integrated)", grade: "A" },
      { code: "22CS402", name: "Web Development Frameworks (Lab Integrated)", grade: "A" },
      { code: "22CS411", name: "Aptitude and Coding Skills II", grade: "B+" },
      { code: "22CS412", name: "Mini Project and Design Thinking Lab", grade: "B+" },
      { code: "22CS413", name: "Product Development Lab– 4", grade: "B+" },
      { code: "22CS907", name: "Cloud Foundations (Lab Integrated)", grade: "A" },
      { code: "22EC441", name: "Microcontrollers and Embedded Systems", grade: "B+" },
      { code: "22MA401", name: "Probability and Statistics (Lab Integrated)", grade: "A+" },
      { code: "22AI302", name: "Data Science using Python (Lab Integrated)", grade: "A" },
    ],
  },
];

export default function Semester1() {
  const [openSemester, setOpenSemester] = useState(null);

  const toggleSemester = (id) => {
    setOpenSemester(openSemester === id ? null : id);
  };

  return (
    <div className="max-h-screen mx-auto mt-10 bg-blue-50">
      {semesterData.map((sem) => (
        <div key={sem.id} className="mb-4 border rounded-lg shadow-lg p-4 bg-white">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSemester(sem.id)}
          >
            <h2 className="text-lg font-semibold">{sem.title}</h2>
            <span className="text-gray-700 text-xl">
              {openSemester === sem.id ? "▲" : "▼"}
            </span>
          </div>

          {openSemester === sem.id && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <p className="text-sm font-medium">GPA: {sem.gpa}</p>
              {sem.cgpa && <p className="text-sm font-medium">CGPA: {sem.cgpa}</p>}

              <table className="w-full text-left border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="border-b p-2">Code</th>
                    <th className="border-b p-2">Subject</th>
                    <th className="border-b p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {sem.subjects.map((subject, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{subject.code}</td>
                      <td className="p-2">{subject.name}</td>
                      <td className="p-2 font-semibold">{subject.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
