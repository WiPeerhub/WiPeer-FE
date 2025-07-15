export default function PasswordInput({ inputPassword, updateInputPassword, errorMessage, confirmPassword }) {
  return (
    <>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={inputPassword}
        onChange={(e) => updateInputPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            confirmPassword();
          }
        }}
        className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
    </>
  );
}
