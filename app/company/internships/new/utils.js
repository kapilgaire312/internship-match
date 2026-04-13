export function errorMessageHandler(error, setError, originalErrors, rawData) {
  function removeErrorMessage(key) {
    const newErrors = new Map(error);
    newErrors.delete(key);
    setError(newErrors);
  }

  function addErrorMessage(key) {
    if (!error.has(key)) {
      if (originalErrors?.has(key)) {
        const newErrors = new Map(error);
        newErrors.set(key, originalErrors.get(key));
        setError(newErrors);
      }
    }
  }
  function handleOnChange(e, name) {
    if (e.target.value !== rawData?.[name]) removeErrorMessage(name);
    else addErrorMessage(name);
  }

  return handleOnChange;
}

export function getSummarySectionInfo() {
  const inputInfo = {
    internshipTitle: {
      title: "Internship Title",
      name: "internshipTitle",
      placeholder: "e.g. Software Engineering Intern",
    },
    monthlySalary: {
      title: "Monthly Salary (NRs)",
      name: "monthlySalary",
      placeholder: "e.g. 15000",
    },
    location: {
      title: "Location",
      name: "location",
      placeholder: "e.g. Kathmandu",
    },
    openings: {
      title: "Openings",
      name: "openings",
      placeholder: "e.g. 4",
    },
  };

  const selectInfo = {
    level: {
      title: "Level",
      name: "level",
      values: ["Beginner", "Medium", "Experienced"],
    },
    workModel: {
      title: "Work Model",
      name: "workModel",
      values: ["remote", "on-site", "hybrid"],
    },
  };

  return { inputInfo, selectInfo };
}

export function getDetailedSectionInfo() {
  const inputInfo = {
    jobDescription: {
      title: "Job Description",
      name: "jobDescription",
      placeholder: "Describe the internship...",
      height: "20vh",
    },
    eligibility: {
      title: "Eligibility",
      name: "eligibility",
      placeholder:
        "e.g. Final year students or recent graduates with a CS degree",
      height: "14vh",
    },
    responsibilities: {
      title: "What You'll do",
      name: "responsibilities",
      placeholder:
        "Describe the day-to-day responsibilities and projects the intern will work on...",
      height: "18vh",
    },
  };
  return inputInfo;
}
