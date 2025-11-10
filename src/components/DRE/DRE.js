import React, { useMemo, useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, LabelList
} from "recharts";
import "./DRE.css";

// ====== DADOS FIXOS (edite aqui) ======
const DATA = [
  {
    mes: "Maio",
    faturamento: 4721368,
    deducao: 0,
    ebitda: 180162,
    cpv: 2338562,
    saldoBanco: 0,
    custos: {
      maoDeObra: 573179,
      custosOperacionais: 889599,
      despesasGlobais: 391702,
    },
  },
  {
    mes: "Junho",
    faturamento: 3872084,
    ebitda: 299473,
    cpv: 1586710,
    saldoBanco: 0,
    custos: {
      maoDeObra: 445339,
      custosOperacionais: 839686,
      despesasGlobais: 335031,
    },
  },
  {
    mes: "Julho",
    faturamento: 4303388,
    ebitda: 529029,
    cpv: 1596919,
    saldoBanco: 0,
    custos: {
      maoDeObra: 500500,
      custosOperacionais: 1028620,
      despesasGlobais: 275336,
    },
  },
  {
    mes: "Agosto",
    faturamento: 4200843,
    ebitda: 149762,
    cpv: 1973222,
    saldoBanco: 0,
    custos: {
      maoDeObra: 480857,
      custosOperacionais: 912160,
      despesasGlobais: 333412,
    },
  },
  {
    mes: "Setembro",
    faturamento: 3557200,
    ebitda: 329559,
    cpv: 1138831,
    saldoBanco: 146040,
    custos: {
      maoDeObra: 393683,
      custosOperacionais: 939939,
      despesasGlobais: 410516,
    },
  },
   {
    mes: "Outubro",
    faturamento: 4347730,
    ebitda: -486362,
    cpv: 2758997,
    saldoBanco: 0,
    custos: {
      maoDeObra: 473810,
      custosOperacionais: 838529,
      despesasGlobais: 266670,
    },
  },
   {
    mes: "Novembro",
    faturamento: 716122,
    ebitda: -1680025,
    cpv: 731917,
    saldoBanco: 0,
    custos: {
      maoDeObra: 426069,
      custosOperacionais: 588293,
      despesasGlobais: 162679,
    },
  },
];

// ====== helpers ======
const money = (v) =>
  (Number(v) || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

const GRAY_2 = "#6B7280"; // axis/legend
const GRAY_3 = "#9CA3AF"; // grid
const BAR_1 = "#4B5563";  // mão de obra
const BAR_2 = "#9CA3AF";  // custos operacionais
const BAR_3 = "#D1D5DB";  // despesas globais

export default function DREFixoDashboard() {
  const [mes, setMes] = useState(DATA[DATA.length - 1].mes);

  useEffect(() => {
    // sempre garante que um mês válido esteja selecionado
    if (!DATA.find((d) => d.mes === mes)) setMes(DATA[DATA.length - 1].mes);
  }, [mes]);

  const current = useMemo(
    () => DATA.find((d) => d.mes === mes) || DATA[DATA.length - 1],
    [mes]
  );

  const custosChart = useMemo(
    () => [
      { nome: "Mão de obra", valor: current.custos.maoDeObra },
      { nome: "Custos operacionais", valor: current.custos.custosOperacionais },
      { nome: "Despesas globais", valor: current.custos.despesasGlobais },
    ],
    [current]
  );

  return (
    <div className="dre-page">
      {/* toolbar */}
      <div className="dre-toolbar">
        <div className="dre-tabs">
          <button className="active">Indicadores</button>
        </div>
        <div className="dre-select">
          <label>Mês</label>
          <select value={mes} onChange={(e) => setMes(e.target.value)}>
            {DATA.map((d) => (
              <option key={d.mes} value={d.mes}>{d.mes}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <section className="dre-cards dre-cards-grid">
        <div className="dre-card">
          <h4>Faturamento</h4>
          <div className="dre-card-row">
            <div className="dre-card-value">{money(current.faturamento)}</div>
          </div>
        </div>


        <div className="dre-card">
          <h4>EBITDA</h4>
          <div className="dre-card-row">
            <div className="dre-card-value">{money(current.ebitda)}</div>
          </div>
        </div>

        <div className="dre-card">
          <h4>CPV (Custo Produtos Vendidos)</h4>
          <div className="dre-card-row">
            <div className="dre-card-value">{money(current.cpv)}</div>
          </div>
        </div>

        <div className="dre-card">
          <h4>Saldo do Banco</h4>
          <div className="dre-card-row">
            <div className="dre-card-value">{money(current.saldoBanco)}</div>
          </div>
        </div>
      </section>

      {/* Gráfico de custos (tons de cinza) */}
      <section className="dre-grid single">
        <div className="dre-panel">
          <h3>Custos — {current.mes}</h3>
            <ResponsiveContainer width="100%" height={340}>
          <BarChart data={custosChart} margin={{ left: 12, right: 12, top: 12, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" tick={{ fill: GRAY_2 }} />
            <YAxis tick={{ fill: GRAY_2 }} />
            <Tooltip formatter={(v) => money(v)} contentStyle={{ borderRadius: 8 }} />
            <Legend wrapperStyle={{ color: GRAY_2 }} />

            <Bar dataKey="valor" name="Valor">
              <Cell fill={BAR_1} />
              <Cell fill={BAR_2} />
              <Cell fill={BAR_3} />
              {/* Aqui adicionamos os valores sobre as barras */}
              <LabelList 
                dataKey="valor" 
                position="top" 
                formatter={(v) => money(v)} 
                fill={GRAY_2} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        </div>
      </section>
    </div>
  );
}
