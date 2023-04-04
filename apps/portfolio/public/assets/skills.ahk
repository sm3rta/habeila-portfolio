#NoEnv
#Warn
#SingleInstance FORCE
CoordMode, Mouse, Screen

Array := []
Array.Push("AWS")
Array.Push("C++")
Array.Push("CSS")
Array.Push("D3.js")
Array.Push("DevExpress")
Array.Push("Express.js")
Array.Push("Firebase")
Array.Push("Git")
Array.Push("GraphQL")
Array.Push("HTML")
Array.Push("JavaScript")
Array.Push("Material UI")
Array.Push("MongoDB")
Array.Push("Next.js")
Array.Push("Node.js")
Array.Push("PostgreSQL")
Array.Push("Python")
Array.Push("React")
Array.Push("Redux")
Array.Push("Sass")
Array.Push("Storybook")
Array.Push("Tailwind CSS")
Array.Push("TypeScript")
Array.Push("Unit Testing")

Esc::
  Suspend
  Pause,, 1
Return

delayAndPressEnter(skill) {
  Send, %skill%
  Sleep, 200
  Send, {Enter}
  Sleep, 2000
Return	
}

!s::
  for index, element in Array ; Enumeration is the recommended approach in most cases.
  {
    ; Using "Loop", indices must be consecutive numbers from 1 to the number
    ; of elements in the array (or they must be calculated within the loop).
    ; MsgBox % "Element number " . A_Index . " is " . Array[A_Index]

    ; Using "for", both the index (or "key") and its associated value
    ; are provided, and the index can be *any* value of your choosing.
    delayAndPressEnter(element)
  }
