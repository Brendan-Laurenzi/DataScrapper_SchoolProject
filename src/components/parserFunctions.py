import json
from collections import OrderedDict

def generate_department_list(fileName):
    File = open(fileName)
    List = json.load(File)
    File.close

    departmentList = []
    for courseDep in List['departments']:
        depString = courseDep['department']
        departmentList.append(depString)

    # for line in courseList:
    #     print(line)
    
    return departmentList

def generate_course_list(fileName):

    File = open(fileName)

    List = json.load(guelphFile)

    File.close

    courseList = []

    for courseDep in List['departments']:

        for eachCourse in courseDep['courses']:
            
            courseString = [courseDep['department'],eachCourse['code'], eachCourse['name'],eachCourse['semester'],eachCourse['credit']]
            # print(courseDep['department'])
            # print(courseString)
            courseList.append(courseString)

    # for line in courseList:
    #     print(line)
    
    return courseList



def find_courses_by_name_code(course, courseList, listToReturn):

    courseInfo = {"department":"none","code":"none", "name":"none", "semester":"none", "credits":"none"}

    for line in courseList:

        if course == line[1]:
            # print(course + "            " + line[1])
            courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
            listToReturn.append(courseInfo)
        elif course == line[2]:
            courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
            listToReturn.append(courseInfo)

    return listToReturn

def find_courses(credit, semester, department, courseList, listToReturn):

    courseInfo = {"department":"none","code":"none", "name":"none", "semester":"none", "credits":"none"}

    if not department:
        for line in courseList:
            if credit and not semester:
                # Find course by credit

                if credit == line[4]:
                    print(line[1] + " " + line[4])
                    courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                    listToReturn.append(courseInfo)

            elif semester and not credit:
                # Find course by semester
                
                if semester in line[3]:
                    print(line[1] + " " + line[3])
                    courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                    listToReturn.append(courseInfo)

            elif credit and semester:
                
                # Find by both credit and semester
                if credit == line[4] and semester in line[3]:
                    print(line[1] + " " + line[3] + " " + line[4])
                    courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                    listToReturn.append(courseInfo)
        
    else:
        # Specific department
        for line in courseList:
            if department in line[0]:
                if credit and not semester:
                    # Find course by credit
                   
                    if credit == line[4]:
                        print(line[1] + " " + line[4])
                        courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                        listToReturn.append(courseInfo)

                elif semester and not credit:
                    # Find course by semester
                   
                    if semester in line[3]:
                        print(line[1] + " " + line[3])
                        courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                        listToReturn.append(courseInfo)

                elif credit and semester:
                    # Find by both credit and semester
                    if credit == line[4] and semester in line[3]:
                        print(line[1] + " " + line[3] + " " + line[4])
                        courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                        listToReturn.append(courseInfo)
                
                else:
                    print(line[1] + " " + line[3] + " " + line[4])
                    courseInfo = {"department": line[0], "code": line[1], "name":line[2], "semester":line[3], "credit":line[4]}
                    listToReturn.append(courseInfo)
   
    return listToReturn

def guelph_parser (uni, course, credit, semester, department):

    print("you have selected: " + uni + " " + course + " " + credit + " " + semester)
    if "UofG" in uni:
        fileName = 'coursesGuelph.json'
    else:
        fileName = 'coursesQueens.json'
    courseList = generate_course_list(fileName)
    returnList = []
    if "list" in uni:
        print('test')
        returnList = generate_guelph_department_list(fileName)
        listJSON = {"departments":returnList}
        courseJSON = json.dumps(listJSON)
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(listJSON, f, ensure_ascii=False, indent=4, sort_keys=True)
        return (courseJSON)
    # generate_guelph_course_list()

    if not credit and not semester and not department and not course:
        returnList = courseList
    elif not course:
        print("no course selected")
        returnList = find_courses(credit, semester, department, courseList, returnList)
    elif course:
        print("course selected")
        returnList = find_courses_by_name_code(course, courseList, returnList)



    # print(returnList)
    listJSON = {"courses":returnList}
    courseJSON = json.dumps(listJSON)
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(listJSON, f, ensure_ascii=False, indent=4, sort_keys=True)
       

    return (courseJSON)
    
    # print(courseJSON)
    


def main ():


    # userChoice = input("1. UofG\n2. Queens\nSelect :")
    # print(userChoice)
    # course = input("Enter a course: ")
    # credit = input("Enter a credit: ")
    # userChoice = input("1. Fall only\n2. Winter only\n3. Summer only\n4. Summer, Fall, and Winter\nSelect: ")
#    uni = "Guelph"

    if (uni == "Guelph"):
        guelph_parser("UofG", "", "0.75", "Winter", "")

    main()
