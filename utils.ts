import { buttonTitle } from "./constant";

export function isBase64DataURL(value: string) {
  const base64Regex = /^data:image\/[a-z]+:base64./;
  return base64Regex.test(value);
}
export const getTitleBtn = (isSubmitting: boolean, type: string) => {
  if (type === buttonTitle.create) {
    return isSubmitting ? buttonTitle.creating : buttonTitle.create;
  } else if (type === buttonTitle.edit) {
    return isSubmitting ? buttonTitle.editing : buttonTitle.edit;
  }
};