"use client";

import { ChangeEvent, FC, FormEvent } from "react";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { FormField } from "../FormField/FormField";

interface IProjectForm {
  type: string;
  session: SessionInterface;
}

export const ProjectForm: FC<IProjectForm> = ({ type, session }) => {
  const handleFormSubmit = (e: FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};

  const form = {
    image: "",
    title: "",
  };

  return (
    <form className={"flexStart form"} onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            width={20}
            height={20}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
    </form>
  );
};
