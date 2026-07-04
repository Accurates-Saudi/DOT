import type {
  ComponentPropsWithoutRef,
  ElementType,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

import { useCmsExperience } from "@/contexts/cms-experience-context";

type PrimitiveProps<T extends ElementType> = {
  as?: T;
  contentId?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function useEditableState(contentId?: string) {
  const { isAdmin, isEditMode } = useCmsExperience();
  const isEditable = Boolean(contentId) && isAdmin && isEditMode;

  return {
    isEditable,
    title: isEditable ? "Editable CMS content" : undefined,
  };
}

function EditablePrimitive<T extends ElementType = "span">({
  as,
  contentId,
  children,
  ...props
}: PrimitiveProps<T>) {
  const Component = (as ?? "span") as ElementType;
  const { isEditable, title } = useEditableState(contentId);
  const componentProps = props as ComponentPropsWithoutRef<T> & {
    className?: string;
    title?: string;
  };

  return (
    <Component
      data-cms-field={contentId}
      data-cms-editable={isEditable ? "true" : undefined}
      {...componentProps}
      className={componentProps.className}
      title={componentProps.title ?? title}
    >
      {children}
    </Component>
  );
}

export function EditableText<T extends ElementType = "span">(
  props: PrimitiveProps<T>,
) {
  return <EditablePrimitive {...props} />;
}

export function EditableRichText<T extends ElementType = "div">(
  props: PrimitiveProps<T>,
) {
  return <EditablePrimitive {...props} />;
}

export function EditableLink<T extends ElementType = "a">(
  props: PrimitiveProps<T>,
) {
  return <EditablePrimitive {...props} />;
}

export function EditableButton<T extends ElementType = "button">(
  props: PrimitiveProps<T>,
) {
  return <EditablePrimitive {...props} />;
}

export interface EditableImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  contentId?: string;
}

export function EditableImage({
  contentId,
  alt = "",
  ...props
}: EditableImageProps) {
  const { isEditable, title } = useEditableState(contentId);

  return (
    <img
      data-cms-field={contentId}
      data-cms-editable={isEditable ? "true" : undefined}
      alt={alt}
      {...props}
      className={props.className}
      title={props.title ?? title}
    />
  );
}
