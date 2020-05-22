import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const NewColorForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin: 0;
  input {
    margin: 3% 0;
  }
  button {
    margin-left: 50%;
    margin-top: 3%;
  }
`

const initialColor = {
  color: "",
  code: { hex: "" },
};

const initialNewColor = {
  colorName: "",
  hexValue: "",
};

const ColorList = ({ colors, updateColors }) => {
  const { id } = useParams();
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialNewColor);
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        console.log(res.data);
        const newColors = colors.filter((color) => {
          if (res.data.id !== color.id) {
            return color;
          }
        });

        updateColors([...newColors, res.data]);
        setEditing(false);
        setColorToEdit(initialColor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        const newColors = colors.filter((color) => {
          if (color.id !== res.data) {
            return color;
          }
        });
        updateColors(newColors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const captureNewColor = (e) => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value,
    });
  };

  const addNewColor = (e) => {
    e.preventDefault();
    const addedColor = {
      color: newColor.colorName,
      code: { hex: newColor.hexValue },
      id: Date.now(),
    };
    axiosWithAuth()
      .post("/api/colors", addedColor)
      .then((res) => {
        console.log(res);
        updateColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // updateColors([...colors, addedColor])
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <NewColorForm onSubmit={addNewColor}>
        <label htmlFor="colorName">Color Name:</label>
        <input
          name="colorName"
          value={newColor.colorName}
          onChange={captureNewColor}
        />
        <label htmlFor="hexValue">Hex Value:</label>
        <input
          name="hexValue"
          value={newColor.hexValue}
          onChange={captureNewColor}
        />
        <button>Add Color</button>
      </NewColorForm>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
