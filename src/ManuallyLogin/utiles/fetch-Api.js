// apiService.js

export const saveFormData = async (formData) => {
    debugger
    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save form data.');
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  