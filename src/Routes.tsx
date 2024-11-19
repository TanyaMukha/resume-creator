import {
  Outlet,
  Route,
  MemoryRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PersonalInfoPage } from "./pages/PersonalInfoPage";
import { EducationPage } from "./pages/EducationPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { FormikProps } from "formik";
import { FC } from "react";
import { SkillGroupsPage } from "./pages/SkillGroupsPage";

interface RoutesComponentProps {
  schema: FormikProps<any>;
  onChange: (field: string, arg: unknown) => void;
  onBlur: (field: string) => void;
  onSave: () => void;
}

export const RoutesComponent: FC<RoutesComponentProps> = ({
  schema,
  onChange,
  onBlur,
  onSave,
}) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route
            index
            element={
              <HomePage
                schema={schema}
                onChange={onChange}
                onBlur={onBlur}
                onSave={onSave}
              />
            }
          />
          <Route path="templates" element={<TemplatesPage />} />
          <Route
            path="profile"
            element={
              <PersonalInfoPage
                schema={schema}
                onChange={onChange}
                onBlur={onBlur}
                onSave={onSave}
              />
            }
          />
          <Route
            path="experience"
            element={
              <ExperiencePage
                experiences={schema.values.experience}
                resume_id={schema.values.id}
                onChange={onChange}
                onBlur={onBlur}
                onSave={onSave}
              />
            }
          />
          <Route
            path="education"
            element={
              <EducationPage
                educations={schema.values.education}
                certificates={schema.values.certificates}
                resume_id={schema.values.id}
                onChange={onChange}
                onBlur={onBlur}
                onSave={onSave}
              />
            }
          />
          <Route
            path="/skill-groups"
            element={<SkillGroupsPage onSave={onSave} onChange={onChange} />}
          />
          <Route
            path="settings"
            element={<SkillGroupsPage onSave={onSave} onChange={onChange} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
