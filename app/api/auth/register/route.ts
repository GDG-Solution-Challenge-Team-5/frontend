import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const { email, password, name } = formData;

    // 필수 필드 검증
    const errors: Record<string, string> = {};

    if (!email) errors.email = '이메일을 입력해야 합니다.';
    if (!password) errors.password = '비밀번호를 입력해야 합니다.';
    if (!name) errors.name = '이름을 입력해야 합니다.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const response = await fetch('http://localhost:8080/members/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          errorCode: errorData.errorCode || 'BAD_REQUEST',
          errorMessage: errorData.errorMessage || '이메일이 이미 존재합니다.',
        },
        { status: 400 },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('회원가입 요청 중 오류 발생:', error);

    return NextResponse.json(
      {
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorMessage: '서버 내부 오류가 발생했습니다. 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
