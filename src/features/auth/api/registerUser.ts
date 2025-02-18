interface RegisterUser {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async (formData: RegisterUser) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || '회원가입에 실패했습니다.');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }
};
