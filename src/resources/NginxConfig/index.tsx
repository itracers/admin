import { TableCell, TableHead, TableRow } from "@material-ui/core";
import {
  Datagrid,
  TextField,
  List,
  ArrayField,
  SingleFieldList,
  ChipField,
  ArrayFieldProps,
  useRecordContext,
  FunctionField,
} from "react-admin";
import * as Prism from "prismjs";

import lodash from "lodash";
import Editor from "react-simple-code-editor";
import React, { Children, ReactElement } from "react";

import "prismjs/components/prism-json";
import "prismjs/themes/prism-coy.css";
import { VerifiedUser, Warning } from "@material-ui/icons";

export const ListNginxConfigs = () => {
  return (
    <List pagination={false}>
      <Datagrid bulkActionButtons={false} expand={ConfigEditor}>
        <TextField source="id" />
        <NginxArrayField source="data.server" label="Server">
          <Datagrid
            bulkActionButtons={false}
            header={<DatagridHeader widths={[0, 1, 1]} />}
          >
            <FunctionField
              render={(record: { ssl_certificate: boolean }) =>
                record.ssl_certificate ? (
                  <VerifiedUser titleAccess="SSL certificate provided" />
                ) : (
                  <Warning titleAccess="No SSL certificate/HTTP only" />
                )
              }
            />
            <NginxArrayField source="server_name" textOnly={true}>
              <SingleFieldList>
                <NginxTextChipField />
              </SingleFieldList>
            </NginxArrayField>
            <ArrayField source="listen">
              <SingleFieldList>
                <NginxTextChipField />
              </SingleFieldList>
            </ArrayField>
          </Datagrid>
        </NginxArrayField>
      </Datagrid>
    </List>
  );
};

const DatagridHeader = ({
  children,
  widths,
}: {
  children?: typeof React.Children;
  widths?: Array<number>;
}) => {
  let sizes: Array<number> = [];
  if (children) {
    const count = Children.count(children);
    sizes = sizes.fill(1, 0).map(() => (1 / count) * 100);
  }
  if (widths) {
    let sum = widths.reduce((a, b) => a + b, 0);
    sizes = widths.map((size) => (size / sum) * 100);
  }
  return (
    <TableHead>
      <TableRow>
        {Children.map(
          children as unknown as Array<ReactElement>,
          (child: ReactElement, i: number) => (
            <TableCell
              key={child.props.source}
              style={{
                width: sizes[i] === undefined ? undefined : `${sizes[i]}%`,
              }}
            >
              {child.props.source}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

const ConfigEditor = ({ record, ...props }: { record: { data: unknown } }) => {
  const [value, setValue] = React.useState(
    JSON.stringify(record.data, null, 2)
  );
  return (
    <Editor
      value={value}
      highlight={(code) => Prism.highlight(code, Prism.languages.json, "json")}
      onValueChange={(code) => setValue(code)}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      {...props}
    ></Editor>
  );
};

const NginxTextChipField = ({ record, ...props }: { record?: string }) => {
  return <ChipField {...props} record={{ value: record }} source="value" />;
};

const NginxArrayField = ({
  source,
  textOnly,
  ...props
}: ArrayFieldProps & { textOnly?: boolean }) => {
  const record = useRecordContext();
  let value = lodash.get(record, source as string);
  if (!(value instanceof Array)) {
    if (typeof value === "string") {
      value = value.split(/\s/).flatMap((s) => s.split(","));
    }
  }
  if (textOnly && value instanceof Array) {
    for (let key in value) {
      if (typeof value[key] === "string") {
        value[key] = value[key]
          .split(/\s/)
          .flatMap((s: string) => s.split(","));
      }
    }
    value = value.flat();
  }
  lodash.set(
    record,
    source as string,
    value instanceof Array ? value : [value]
  );

  return <ArrayField {...props} source={source}></ArrayField>;
};
