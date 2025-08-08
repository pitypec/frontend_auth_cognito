import { type Dispatch, type SetStateAction } from "react";
import Dropzone from "react-dropzone";

const DragAndDropInput = ({
  setFieldValue,
  values,
  maxFile,
  setPreviewFiles,
}: {
  setFieldValue: any;
  values: any;
  maxFile?: number;
  setPreviewFiles: Dispatch<SetStateAction<any[]>>;
}) => {
  return (
    <Dropzone
      // style={{}}
      accept={{
        "image/*": [],
      }}
      onDrop={(acceptedFiles: any) => {
        // do nothing if no files
        if (acceptedFiles.length === 0) {
          return <p>Please upload an image</p>;
        }
        if (
          maxFile ? acceptedFiles?.length === maxFile : acceptedFiles?.length
        ) {
          // on drop we add to the existing files
          setFieldValue("files", values.files.concat(acceptedFiles));
          setPreviewFiles((prev: any) => [
            ...prev,
            ...acceptedFiles.map((file: any) => {
              return Object.assign({}, file, {
                preview: URL.createObjectURL(file),
                size: file.size / 1024,
                name:
                  file.name.length > 20
                    ? "_img" +
                      `${Date.now()}` +
                      `${file.name}`
                        .slice(`${file.name}`.length - 5, `${file.name}`.length)
                        .trim()
                    : file.name,
                type: file.type,
              });
            }),
          ]);
        }
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }: any) => {
        return (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-[14px]">
                    <span className="font-semibold pr-[10px]">
                      Click to upload
                    </span>
                    or drag and drop
                  </p>
                  <p className="text-[12px]">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DragAndDropInput;
