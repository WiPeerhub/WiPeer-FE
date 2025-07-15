import PasswordInput from "@/components/PasswordConfirmModal/PasswordInput";
import PasswordConfirmButton from "@/components/PasswordConfirmModal/PasswordConfirmButton";

export default function PasswordModal({
  errorMessage,
  inputPassword,
  passwordInputOpen,
  updateInputPassword,
  confirmPassword,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">비밀번호 입력</h2>
        <PasswordInput
          inputPassword={inputPassword}
          updateInputPassword={updateInputPassword}
          errorMessage={errorMessage}
          confirmPassword={confirmPassword}
        />
        <PasswordConfirmButton passwordInputOpen={passwordInputOpen} confirmPassword={confirmPassword} />
      </div>
    </div>
  );
}
