const BASE_URL = "http://localhost:7000";

// ===================
// Employee Functions
// ===================

export const GetAllEmployees = async (search = "", limit = "5", page = "") => {
  const url = `${BASE_URL}/api/employees?search=${search}&limit=${limit}&page=${page}`;
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return error;
  }
};

export const GetEmployeeDetailsById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    const { data } = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteEmployeeById = async (id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;
  const formData = new FormData();
  for (const key in empObj) {
    formData.append(key, empObj[key]);
  }
  try {
    const options = { method: "POST", body: formData };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateEmployeeById = async (empObj, id) => {
  const url = `${BASE_URL}/api/employees/${id}`;
  const formData = new FormData();
  for (const key in empObj) {
    formData.append(key, empObj[key]);
  }
  try {
    const options = { method: "PUT", body: formData };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

// ===================
// Project Functions
// ===================

export const GetAllProjects = async (search = "", limit = "5", page = "") => {
  const url = `${BASE_URL}/api/projects?search=${search}&limit=${limit}&page=${page}`;
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const CreateProject = async (projectObj) => {
  const url = `${BASE_URL}/api/projects`;
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectObj),
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const UpdateProjectById = async (projectObj, id) => {
  const url = `${BASE_URL}/api/projects/${id}`;
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectObj),
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const DeleteProjectById = async (id) => {
  const url = `${BASE_URL}/api/projects/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

// ===================
// Timesheet Functions
// ===================

export const GetAllTimesheets = async (search = "", limit = "5", page = "") => {
  const url = `${BASE_URL}/api/timesheets?search=${search}&limit=${limit}&page=${page}`;
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    console.log(result,"aaaaaaaaaaaaaaaaa");
    
    return await result.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const CreateTimesheet = async (timesheetObj) => {
  const url = `${BASE_URL}/api/timesheets`;
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(timesheetObj),
    };
    const result = await fetch(url, options);
    console.log(result,"22222222222222222")
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const UpdateTimesheetById = async (timesheetObj, id) => {
  const url = `${BASE_URL}/api/timesheets/${id}`;
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(timesheetObj),
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const DeleteTimesheetById = async (id) => {
  const url = `${BASE_URL}/api/timesheets/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

// ===================
// Lead & CRM Functions
// ===================

export const GetAllLeads = async (search = "", limit = "5", page = "") => {
  const url = `${BASE_URL}/api/leads?search=${search}&limit=${limit}&page=${page}`;
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const CreateLead = async (leadObj) => {
  const url = `${BASE_URL}/api/leads`;
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadObj),
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const UpdateLeadById = async (leadObj, id) => {
  const url = `${BASE_URL}/api/leads/${id}`;
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadObj),
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};

export const DeleteLeadById = async (id) => {
  const url = `${BASE_URL}/api/leads/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch(url, options);
    return await result.json();
  } catch (error) {
    return error;
  }
};


