import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Heading.module.scss";
import { mapToCssModules } from "../../helpers";
import { LEVELS } from "./constants";

const propTypes = {
  "aria-label": PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf(Object.values(LEVELS)),
};

const defaultProps = {
  disabled: false,
  isDownload: false,
  isRouted: false,
};

export const Heading = forwardRef((props, ref) => {
  const { children, className, level } = props;

  // TODO: Do we validate if 'to' is a URL or path?

  let Tag = "h1";

  if (level && Tag === "h1") {
    Tag = level;
  }

  const classNamesToApply = mapToCssModules(
    classNames("heading", className, level && level),
    styles
  );

  return <Tag className={classNamesToApply}>{children}</Tag>;
});

Heading.displayName = "Heading";
Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;
