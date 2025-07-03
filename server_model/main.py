# import fitz  # PyMuPDF
# import sys
# import json

# def process_pdf(file_path):
#     # Open the PDF file
#     doc = fitz.open(file_path)
#     # Load the first page
#     page = doc.load_page(0)
#     # Extract text from the page
#     text = page.get_text()

#     # Dictionary to store details
#     details = {
#         "PATIENT NAME": "",
#         "SEX": "",
#         "AGE": "",
#         "WEIGHT": "",
#         "TEST TYPE": "URINE TEST",
#         "TEST RESULTS": {
#             "Color": "",
#             "Appearance": "",
#             "Specific Gravity": "",
#             "pH": "",
#             "Protein": "",
#             "Glucose": "",
#             "Ketones": "",
#             "Bilirubin": "",
#             "Urobilinogen": "",
#             "Nitrite": "",
#             "Leukocyte Esterase": "",
#             "Microscopic Examination": {
#                 "WBCs": "",
#                 "RBCs": "",
#                 "Bacteria": "",
#                 "Epithelial Cells": ""
#             }
#         },
#         "ADDITIONAL INFORMATION": {
#             "Symptoms": "",
#             "Current Medication Usage": "",
#             "Any extra information you'd want to give": ""
#         }
#     }

#     # Split the text into lines
#     lines = text.split('\n')

#     i = 0
#     # Iterate through lines to extract information
#     while i < len(lines):
#         line_lower = lines[i].strip().lower()  # Convert the line to lowercase
#         if "patient name" in line_lower:
#             details["PATIENT NAME"] = lines[i + 1]
#         elif ("male" in line_lower or "female" in line_lower) and i <= 10:
#             details["SEX"] = lines[i]
#         elif "years" in line_lower:
#             details["AGE"] = lines[i]
#         elif "kgs" in line_lower:
#             details["WEIGHT"] = lines[i + 1]

#         elif "color" in line_lower:
#             details["TEST RESULTS"]["Color"] = lines[i + 1]
#         elif "appearance" in line_lower:
#             details["TEST RESULTS"]["Appearance"] = lines[i + 1]
#         elif "specific gravity" in line_lower:
#             details["TEST RESULTS"]["Specific Gravity"] = lines[i + 1]
#         elif "ph" in line_lower:
#             details["TEST RESULTS"]["pH"] = lines[i + 1]
#         elif "protein" in line_lower:
#             details["TEST RESULTS"]["Protein"] = lines[i + 1]
#         elif "glucose" in line_lower:
#             details["TEST RESULTS"]["Glucose"] = lines[i + 1]
#         elif "ketones" in line_lower:
#             details["TEST RESULTS"]["Ketones"] = lines[i + 1]
#         elif "bilirubin" in line_lower:
#             details["TEST RESULTS"]["Bilirubin"] = lines[i + 1]
#         elif "urobilinogen" in line_lower:
#             details["TEST RESULTS"]["Urobilinogen"] = lines[i + 1]
#         elif "nitrite" in line_lower:
#             details["TEST RESULTS"]["Nitrite"] = lines[i + 1]
#         elif "leukocyte esterase" in line_lower:
#             details["TEST RESULTS"]["Leukocyte Esterase"] = lines[i + 1]

#         elif "wbcs" in line_lower:
#             details["TEST RESULTS"]["Microscopic Examination"]["WBCs"] = lines[i + 1]
#         elif "rbcs" in line_lower:
#             details["TEST RESULTS"]["Microscopic Examination"]["RBCs"] = lines[i + 1]
#         elif "bacteria" in line_lower:
#             details["TEST RESULTS"]["Microscopic Examination"]["Bacteria"] = lines[i + 1]
#         elif "epithelial cells" in line_lower:
#             details["TEST RESULTS"]["Microscopic Examination"]["Epithelial Cells"] = lines[i + 1]

#         i += 1

#     return details

# if __name__ == "__main__":
#     file_path = sys.argv[1]
#     details = process_pdf(file_path)
#     print(json.dumps(details, indent=4))




import fitz  # PyMuPDF
import sys
import json

def process_pdf(file_path):
    # Open the PDF file
    doc = fitz.open(file_path)
    # Load the first page
    page = doc.load_page(0)
    # Extract text from the page
    text = page.get_text()

    # Dictionary to store details
    details = {
        "PATIENT NAME" : "",
        "SEX" : "",
        "AGE" : "",
        "WEIGHT" : "",
        "TEST TYPE" : "COMPLETE BLOOD COUNT",
        "TEST RESULTS" : {
            "Haemoglobin": "",
            "RBC Count": "",
            "PCV": "",
            "RBC INDICES": {
                "MCV": "",
                "MCH": "",
                "MCHC": "",
                "RDW": ""
            },
            "TOTAL WBC COUNT": {
                "Total WBC Count": "",
                "Differential count": {
                    "Neutrophils": "",
                    "Lymphocytes": "",
                    "Eosinophils": "",
                    "Monocytes": "",
                    "Basophils": ""
                },
                "Absolute Leucocyte Count":{
                    "Absolute Neutrophil Count":"",
                    "Absolute Lymphocyte Count":"",
                    "Absolute Eosinophil Count":"",
                    "Absolute Monocyte Count":"",
                    "Absolute Basophils Count":"",}
                },
            "PLATELETS": {
                "Platelet Count": "",
                "Platelets on Smear": ""
            },
            "PERIPHERAL BLOOD SMEAR": {
                "RBC": "",
                "WBC": "",
                "Platelets": ""
            }
        },
        "ADDITIONAL INFORMATION":{
        "Symptoms":"",
        "Current Medication Usage":"",
        "Any extra information you'd want to give":""
        }
    }

    # Split the text into lines
    lines = text.split('\n')

    i=0
    # Iterate through lines to extract information
    while i < len(lines):
        if "PATIENT NAME" in lines[i]:
            details["PATIENT NAME"] = lines[i + 1]
        elif "Male" in lines[i] or "Female" in lines[i] and i<=10:
            details["SEX"] = lines[i]
        elif "Years" in lines[i]:
            details["AGE"] = lines[i]
        elif "Kgs" in lines[i]:
            details["WEIGHT"] = lines[i + 1]

        elif "Haemoglobin" in lines[i]:
            details["TEST RESULTS"]["Haemoglobin"] = lines[i + 1]

        elif "RBC  Count" in lines[i]:
            details["TEST RESULTS"]["RBC Count"] = lines[i + 1]

        elif "PCV" in lines[i]:
            details["TEST RESULTS"]["PCV"] = lines[i + 1]

        elif "MCV" in lines[i]:
            details["TEST RESULTS"]["RBC INDICES"]["MCV"] = lines[i + 1]
        elif "MCH." in lines[i]:
            details["TEST RESULTS"]["RBC INDICES"]["MCH"] = lines[i + 1]
        elif "MCHC" in lines[i]:
            details["TEST RESULTS"]["RBC INDICES"]["MCHC"] = lines[i + 1]
        elif "RDW." in lines[i]:
            details["TEST RESULTS"]["RBC INDICES"]["RDW"] = lines[i + 1]

        elif "Total WBC Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Total WBC Count"] = lines[i + 1]
        elif "Neutrophils" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Differential count"]["Neutrophils"] = lines[i + 1]
        elif "Lymphocytes" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Differential count"]["Lymphocytes"] = lines[i + 1]
        elif "Eosinophils" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Differential count"]["Eosinophils"] = lines[i + 1]
        elif "Monocytes" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Differential count"]["Monocytes"] = lines[i + 1]
        elif "Basophils" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Differential count"]["Basophils"] = lines[i + 1]

        elif "Absolute Neutrophil Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Absolute Leucocyte Count"]["Absolute Neutrophil Count"] = lines[i + 1]
        elif "Absolute Lymphocyte Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Absolute Leucocyte Count"]["Absolute Lymphocyte Count"] = lines[i + 1]
        elif "Absolute Eosinophil Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Absolute Leucocyte Count"]["Absolute Eosinophil Count"] = lines[i + 1]
        elif "Absolute Monocyte Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Absolute Leucocyte Count"]["Absolute Monocyte Count"] = lines[i + 1]
        elif "Absolute Basophils Count" in lines[i]:
            details["TEST RESULTS"]["TOTAL WBC COUNT"]["Absolute Leucocyte Count"]["Absolute Basophils Count"] = lines[i + 1]

        elif "Platelet Count" in lines[i]:
            details["TEST RESULTS"]["PLATELETS"]["Platelet Count"] = lines[i + 1]
        elif "Platelets on Smear" in lines[i]:
            details["TEST RESULTS"]["PLATELETS"]["Platelets on Smear"] = lines[i + 1]

        elif "RBC Morphology" in lines[i]:
            details["TEST RESULTS"]["PERIPHERAL BLOOD SMEAR"]["RBC"] = lines[i + 1]
        elif "WBCs on PS" in lines[i]:
            details["TEST RESULTS"]["PERIPHERAL BLOOD SMEAR"]["WBC"] = lines[i + 1]
        elif "Platelets" in lines[i]:
            details["TEST RESULTS"]["PERIPHERAL BLOOD SMEAR"]["Platelets"] = lines[i + 1]

        i += 1

    return details

if __name__ == "__main__":
    file_path = sys.argv[1]
    details = process_pdf(file_path)
    print(json.dumps(details))
