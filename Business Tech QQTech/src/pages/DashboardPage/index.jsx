import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import styled from "styled-components";
import {
  Card,
  Grid,
  Col,
  Metric,
  Text,
  Title,
  DonutChart,
  LineChart,
  BarChart,
} from "@tremor/react";
import NaoAutorizado from "../NaoAutorizado";
import { useEffect, useState } from "react";
import { getDashboard } from "../../api/Dashboard";

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
`;

const DashboardPage = ({ user, setUser }) => {
  const [dados, setDados] = useState();

  if (user.tipo !== "admin") {
    return <NaoAutorizado />;
  }

  useEffect(() => {
    getDashboard(setDados);
  }, []);

  if (!dados) {
    console.log("entrou carregando");
    return <h1>Carregando</h1>;
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <H1Estilizado>Dashboard</H1Estilizado>
        <Grid numItems={3} className="gap-2 ">
          <Col numColSpanLg={1} numColSpanSm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.cards[0].title}</Title>
              <Text>{dados.cards[0].description}</Text>
              <Metric>{dados.cards[0].value}</Metric>
            </Card>
          </Col>
          <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.cards[1].title}</Title>
              <Text>{dados.cards[1].description}</Text>
              <Metric>{dados.cards[1].value}</Metric>
            </Card>
          </Col>
          <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
          <Card className="h-full">
            <Title>{dados.cards[2].title}</Title>
            <Text>{dados.cards[2].description}</Text>
            <Metric>{dados.cards[2].value}</Metric>
          </Card>
          </Col>
          <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
          <Card className="h-full">
            <Title>{dados.cards[3].title}</Title>
            <Text>{dados.cards[3].description}</Text>
            <Metric>{dados.cards[3].value}</Metric>
          </Card>
          </Col>
          <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
          <Card className="h-full">
            <Title>{dados.cards[4].title}</Title>
            <Text>{dados.cards[4].description}</Text>
            <Metric>{dados.cards[4].value}</Metric>
          </Card>
          </Col>
          {dados.charts[0].values.length > 0 && (
            <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.charts[0].title}</Title>
              <DonutChart
                data={dados.charts[0].values}
                category="value"
                index="name"
                colors={["yellow", "orange"]}
              />
            </Card>
            </Col>
          )}
          {dados.charts[1].values.length > 0 && (
            <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.charts[1].title}</Title>
              <DonutChart
                data={dados.charts[1].values}
                category="value"
                index="name"
                colors={["cyan", "sky"]}
              />
            </Card>
            </Col>
          )}
          {dados.charts[2].values.length > 0 && (
            <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.charts[2].title}</Title>
              <DonutChart
                data={dados.charts[2].values}
                category="value"
                index="name"
                colors={["indigo", "violet"]}
              />
            </Card>
            </Col>
          )}
          {dados.charts[6].values.length > 0 && (
            <Col numColSpanLg={1} numColSpansm={3} numColSpan={3}>
            <Card className="h-full">
              <Title>{dados.charts[6].title}</Title>
              <DonutChart
                data={dados.charts[6].values}
                index="name"
                categories={["value"]}
                colors={["red", "orange", "pink", "purple", "indigo"]}
              />
            </Card>
            </Col>
          )}
          {dados.charts[3].values.length > 0 && (
            <Col numColSpan={3}>
              <Card>
                <Title>{dados.charts[3].title}</Title>
                <BarChart
                  data={dados.charts[3].values}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  showAnimation={true}
                  showLegend={false}
                />
              </Card>
            </Col>
          )}
          {dados.charts[4].values.length > 0 && (
            <Col numColSpan={3}>
            <Card>
              <Title>{dados.charts[4].title}</Title>
              <BarChart
                data={dados.charts[4].values}
                index="name"
                categories={["value"]}
                colors={["red"]}
                showAnimation={true}
                showLegend={false}
              />
            </Card>
            </Col>
          )}
          {dados.charts[5].values.length > 0 && (
            <Col numColSpan={3}>
            <Card>
              <Title>{dados.charts[5].title}</Title>
              <BarChart
                data={dados.charts[5].values}
                index="name"
                categories={["value"]}
                colors={["green"]}
                showAnimation={true}
                showLegend={false}
              />
            </Card>
            </Col>
          )}

          {dados.charts[8].values.length > 0 && (
            <Col numColSpan={3}>
              <Card>
                <Title>{dados.charts[8].title}</Title>
                <LineChart
                  data={dados.charts[8].values}
                  index="name"
                  categories={["value"]}
                  colors={["red"]}
                  showAnimation={true}
                  showLegend={false}
                />
              </Card>
            </Col>
          )}
          {dados.charts[9].values.length > 0 && (
            <Col numColSpan={3}>
              <Card>
                <Title>{dados.charts[9].title}</Title>
                <BarChart
                  data={dados.charts[9].values}
                  index="name"
                  categories={["value"]}
                  colors={["teal"]}
                  showAnimation={true}
                  showLegend={false}
                />
              </Card>
            </Col>
          )}
          {dados.charts[10].values.length > 0 && (
            <Col numColSpan={3}>
              <Card>
                <Title>{dados.charts[10].title}</Title>
                <BarChart
                  data={dados.charts[10].values}
                  index="name"
                  categories={["value"]}
                  colors={["teal"]}
                  showAnimation={true}
                  showLegend={false}
                />
              </Card>
            </Col>
          )}
        </Grid>
      </BodyContent>
    </>
  );
};

export default DashboardPage;
