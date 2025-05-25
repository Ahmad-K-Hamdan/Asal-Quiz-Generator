import { DrawerProps } from "@fluentui/react-components";
import * as React from "react";
import {
  AppItem,
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,

} from "@fluentui/react-nav-preview";

import {
  Tooltip,
  makeStyles,
  tokens,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
  Book20Regular,
  QuizNew20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  nav: {
    minWidth: "200px",
    height: "100vh",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular
);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular
);



type DrawerType = Required<DrawerProps>["type"];

export const Basic = (props: Partial<NavDrawerProps>) => {
  const styles = useStyles();



  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");
  const [isMultiple, setIsMultiple] = React.useState(true);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const linkDestination = enabledLinks ? "https://www.bing.com" : "";

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
        className={styles.nav}
      >
        <NavDrawerHeader>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
          </Tooltip>
        </NavDrawerHeader>

        <NavDrawerBody>
          <AppItem
            icon={<PersonCircle32Regular />}
            as="a"
            href={linkDestination}
          >
            User name
          </AppItem>
          <NavItem href={linkDestination} icon={<Dashboard />} value="1">
            Dashboard
          </NavItem>
          <NavItem href={linkDestination} icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem
            href={linkDestination}
            icon={<EmployeeSpotlight />}
            value="3"
          >
            Employee Spotlight
          </NavItem>
          <NavItem icon={<Search />} href={linkDestination} value="4">
            Profile
          </NavItem>
          <NavItem
            icon={<PerformanceReviews />}
            href={linkDestination}
            value="5"
          >
            Performance Reviews
          </NavItem>
          <NavSectionHeader>Catagories</NavSectionHeader>
      
          <NavItem href="/categories" icon={<Book20Regular />} value="9">
            Categories
          </NavItem>

          <NavSectionHeader>Quizes</NavSectionHeader>
          <NavItem icon={<QuizNew20Regular />} value="10">
            Quizes
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
  <Tooltip content="Toggle navigation pane" relationship="label">
    <Hamburger
      onClick={() => setIsOpen(!isOpen)}
      {...restoreFocusTargetAttributes}
    />
  </Tooltip>

  <h1 style={{ marginTop: "16px" }}>Welcome back, Raya!</h1>
  <p style={{ marginTop: "4px" }}>
    Here’s a quick overview of your dashboard.
  </p>

  <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", minWidth: "150px" }}>
      <strong>Categories</strong>
      <p>12</p>
    </div>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", minWidth: "150px" }}>
      <strong>Quizzes</strong>
      <p>8</p>
    </div>
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", minWidth: "150px" }}>
      <strong>Reviews Pending</strong>
      <p>3</p>
    </div>
  </div>

  <div style={{ marginTop: "32px" }}>
    <h3>Recent Activity</h3>
    <ul style={{ paddingLeft: "20px" }}>
      <li>Created quiz: <strong>"Intro to Networking"</strong></li>
      <li>Added new category: <strong>"AI Basics"</strong></li>
      <li>Reviewed 2 employee submissions</li>
    </ul>
  </div>

  <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
    <button style={{ padding: "8px 16px", backgroundColor: "#0078D4", color: "white", borderRadius: "4px", border: "none" }}>
      + Create Quiz
    </button>
    <button style={{ padding: "8px 16px", backgroundColor: "#E1E1E1", borderRadius: "4px", border: "none" }}>
      View Categories
    </button>
  </div>
</div>

    </div>
  );
};