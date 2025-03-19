import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { fetchOptionsChain } from "@/utils/api";
import { AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OptionChains = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchOptionsChain();
        setOptionsData(data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading options data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">AI-Generated Smart Option Chains</h2>
      <Card className="mt-6">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Strike Price</TableHeader>
                <TableHeader>IV Rank</TableHeader>
                <TableHeader>OI Change</TableHeader>
                <TableHeader>AI Insights</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {optionsData.length > 0 ? (
                optionsData.map((option, index) => (
                  <TableRow key={index}>
                    <TableCell>{option.strike}</TableCell>
                    <TableCell>{option.ivRank}%</TableCell>
                    <TableCell>{option.oiChange > 0 ? `+${option.oiChange}` : option.oiChange}</TableCell>
                    <TableCell>
                      {option.aiSignal === "BUY" ? (
                        <Badge variant="success"><TrendingUp className="w-4 h-4 inline mr-2" /> Bullish</Badge>
                      ) : (
                        <Badge variant="destructive"><AlertCircle className="w-4 h-4 inline mr-2" /> Bearish</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptionChains;
