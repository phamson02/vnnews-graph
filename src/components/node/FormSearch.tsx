import { Attributes } from "graphology-types";
import React, {
  ChangeEvent,
  FC,
  useState,
} from "react";
import { BsSearch } from "react-icons/bs";
import { useSigma } from "react-sigma-v2";
import { FiltersState } from "../../types";

const FormSearch: FC<{ filters: FiltersState }> = ({ filters }) => {
  const sigma = useSigma();
  const [data, setData] = useState<{ source: string; target: string }>({
    source: "",
    target: "",
  });
  const [values, setValues] = useState<Array<{}>>([]);
  const [selected, setSelected] = useState<{ source: {}; target: {} }>({
    source: {},
    target: {},
  });

  const onSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;
    setData({ ...data, source: searchString });
  };

  const onTargetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;
    setData({ ...data, target: searchString });
  };

  const handleSearch = () => {
    if (data.source.length > 0 && data.target.length > 0) {
      sigma
        .getGraph()
        .forEachNode((key: string, attributes: Attributes): void => {
          setValues((values) => [...values, { ...attributes }]);
        });
    }

    values?.forEach((value: { [lable: string]: any }) => {
      if (value.label === data.source) {
        setSelected({ ...selected, source: value });
      } else if (value.label === data.target) {
        setSelected({ ...selected, target: value });
      }
    });
  };

  return (
    <div className="search-wrapper">
      <input
        type="search"
        placeholder="Search in source..."
        list="source"
        onChange={onSourceChange}
      />
      <input
        type="search"
        placeholder="Search in target..."
        list="target"
        onChange={onTargetChange}
      />
      <BsSearch className="icon" />

      <button className="btn" onClick={handleSearch}>
        search
      </button>
    </div>
  );
};

export default FormSearch;
