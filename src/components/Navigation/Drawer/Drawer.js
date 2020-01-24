import React from "react";
import classes from "./Drawer.css";
import {Component} from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.Close);
    }
    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>
            <li>
              <a>Меню</a>
              <a onClick={this.props.onRetry}>Вопросы</a>
            </li>
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
