import { ContainerScroll } from './ui/container-scroll-animation';
import './ShowcaseScroll.css';

const ShowcaseScroll: React.FC = () => {
  return (
    <div className="showcase-scroll-wrapper">
      <ContainerScroll
        titleComponent={
          <div className="showcase-title-block">
            <span className="showcase-label">Портфолио</span>
            <h2 className="showcase-heading">
              Проекти, изградени с<br />
              <span className="gradient-text">Прецизност & Визия</span>
            </h2>
          </div>
        }
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/projects/needo.jpg`}
          alt="Needo — Services Marketplace проект от DavidaX"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "12px",
          }}
        />
      </ContainerScroll>
    </div>
  );
};

export default ShowcaseScroll;
