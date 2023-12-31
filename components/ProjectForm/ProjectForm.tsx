"use client";

import { useState, ChangeEvent, FC, FormEvent } from "react";
import { SessionInterface, FormState, ProjectInterface } from "@/common.types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormField } from "../FormField/FormField";
import { categoryFilters, buttonTitle } from "@/constant";
import { CustomMenu } from "../CustomMenu/CustomMenu";
import Button from "../Button/Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { getTitleBtn } from "@/utils";

interface IProjectFormProps {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}

export const ProjectForm: FC<IProjectFormProps> = ({
  type,
  session,
  project,
}) => {
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();
    try {
      if (type === buttonTitle.create) {
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === buttonTitle.edit) {
        await updateProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const titleBtn = getTitleBtn(isSubmitting, type);
  if (!titleBtn) {
    return null;
  }
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
          required={type === "CREATE"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
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
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/dimonikr"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={titleBtn}
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        ></Button>
      </div>
    </form>
  );
};
