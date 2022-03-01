import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";
import { mapToCssModules } from "../../helpers";
import { TYPES } from "./constants";

const propTypes = {
  /**
   * ARIA HERE
   */
  "aria-label": PropTypes.string,
  /**
   * ARIA THERE
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isDownload: PropTypes.bool,
  isRouted: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  /**
   * FX
   */
  type: PropTypes.oneOf(Object.values(TYPES)),
};

const defaultProps = {
  disabled: false,
  isDownload: false,
  isRouted: false,
};

export const Button = forwardRef((props, ref) => {
  const {
    children,
    className,
    disabled,
    isDownload,
    isRouted,
    to,
    type,
    onClick,
  } = props;

  // TODO: Do we validate if 'to' is a URL or path?

  let Tag = "button";

  if (to && type === "link" && Tag === "button") {
    Tag = "a";
  }

  const classNamesToApply = mapToCssModules(
    classNames(
      "button",
      className,
      Tag === "a" && "isLink",
      isDownload && "isDownload",
      disabled && "disabled"
    ),
    styles
  );

  const downloadContent = (
    <>
      <span className="button__text">Download file</span>
    </>
  );

  const standardContent = (
    <>
      <span className="button__text">{children}</span>
    </>
  );

  return (
    <Tag
      className={classNamesToApply}
      href={Tag === "a" ? to : null}
      onClick={Tag === "button" ? onClick : null}
      disabled={disabled}
      type={type}
      rel={Tag === "a" ? "noopener noreferrer" : null}
      target={Tag === "a" ? "_blank" : null}
    >
      {isDownload ? downloadContent : standardContent}
    </Tag>
  );
});

Button.displayName = "Button";
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
