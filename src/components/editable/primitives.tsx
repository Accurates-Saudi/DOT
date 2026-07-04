import type {
  ComponentPropsWithoutRef,
  ElementType,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

type PrimitiveProps<T extends ElementType> = {
  as?: T;
  contentId?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function EditablePrimitive<T extends ElementType = "span">({
  as,
  contentId,
  children,
  ...props
}: PrimitiveProps<T>) {
  const Component = (as ?? "span") as ElementType;

  return (
    <Component data-cms-field={contentId} {...props}>
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
  return <img data-cms-field={contentId} alt={alt} {...props} />;
}
